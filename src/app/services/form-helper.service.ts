import { Injectable } from "@angular/core";
import * as provinceJson from "../../assets/provincias.json";
import * as cityJson from "../../assets/municipios.json";
import * as townJson from "../../assets/poblacion.json";
import { Cups } from "../interfaces/interfaces";

@Injectable({
	providedIn: "root",
})
export class FormHelperService {
	provinces = (provinceJson as any).default;
	cities = (cityJson as any).default;
	towns = (townJson as any).default;

	constructor() { }

	validateNifNie(nif: string): boolean {
		let validChars = "TRWAGMYFPDXBNJZSQVHLCKET";
		let nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
		let nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;

		if (!nifRexp.test(nif) && !nieRexp.test(nif)) return false;

		let nie = nif.replace(/^[X]/, "0").replace(/^[Y]/, "1").replace(/^[Z]/, "2");

		let letter = nif.substr(-1);
		let charIndex = parseInt(nie.substr(0, 8)) % 23;

		if (validChars.charAt(charIndex) === letter) return true;

		return false;
	}

	validateCif(cif: string): boolean {
		cif = cif.toUpperCase();
		const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

		if (CIF_REGEX.test(cif)) {
			const match = cif.match(CIF_REGEX);
			const letter = match ? match[1] : null;
			const numberCif = match ? match[2] : null;
			const control = match ? match[3] : null;

			let evenSum = 0;
			let oddSum = 0;
			let n: number;
			if (numberCif) {
				for (let i = 0; i < numberCif.length; i++) {
					n = parseInt(numberCif[i], 10);

					if (i % 2 === 0) {
						n *= 2;
						oddSum += n < 10 ? n : n - 9;
					} else {
						evenSum += n;
					}
				}
			}

			const controlDigit = (10 - parseInt((evenSum + oddSum).toString().substr(-1), 10)).toString().substr(-1);
			const controlLetter = "JABCDEFGHI".substr(parseInt(controlDigit, 10), 1);
			if (letter) {
				if (
					(letter.match(/[ABEH]/) && control === controlDigit) ||
					(letter.match(/[KPQS]/) && control === controlLetter) ||
					control === controlDigit ||
					control === controlLetter
				) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		return false;
	}

	validateMail(mail: string): boolean {
		const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (MAIL_REGEX.test(mail)) {
			return true;
		} else {
			return false;
		}
	}
	async toBase64(file: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	townFilter(data: string): string[] {
		let filteredOptions: any[];
		filteredOptions = this._filterTown(data).length !== 0 ? this._filterTown(data) : (filteredOptions = []);
		return filteredOptions;
	}

	municipalyFilter(data: string): string[] {
		let filteredOptions: any[];
		filteredOptions = this._filterMunicipality(data).length !== 0 ? this._filterMunicipality(data) : (filteredOptions = []);
		return filteredOptions;
	}

	provinceFilter(data: any): string {
		let filteredOptions: string;
		filteredOptions = this._filterProvince(data).length !== 0 ? this._filterProvince(data) : this.provinces;
		return filteredOptions;
	}

	private _filterTown(value: string): string[] {
		value = value.toLowerCase();
		return this.towns.filter((town: any) => town.municipio.toLowerCase() === value);
	}

	private _filterMunicipality(value: string): string[] {
		let municipality: any[];
		municipality = this.cities.filter((cities: any) => cities.provincia_id === value);
		return municipality ? municipality : [];
	}

	private _filterProvince(value: string): string {
		switch (value) {
			case "Valencia":
			case "València":
				value = "Valencia/València";
				break;

			case "Araba":
			case "Alava":
				value = "Araba/Álava";
				break;

			case "Alicante":
			case "Alacant":
				value = "Alicante/Alacant";
				break;

			case "Bizkaia":
			case "Vizcaya":
				value = "Bizkaia/Vizcaya";
				break;

			case "Castellón":
			case "Castelló":
				value = "Castellón/Castelló";
				break;

			default:
				break;
		}
		let provinceUser = this.provinces.filter((province: any) => province.nombre === value)[0];
		return provinceUser ? provinceUser.provincia_id : "";
	}

	validateDataCups(cups: Cups): void {
		switch (cups.type) {
			case "luz":
				if (
					cups.luz &&
					cups.luz.PotenciasLuz &&
					cups.luz.PrecioTotalLuz &&
					cups.luz.DiasFacturadosLuz &&
					cups.luz.consumoP1 &&
					cups.luz.PotenciasLuz.potenciaContratadaP1 &&
					cups.luz.PeajeLuz
				) {
					cups.displayprice = "invoice";
				} else {
					cups.displayprice = "CUPS";
				}
				break;
			case "gas":
				if (cups.gas &&
					cups.gas.EnergiaConsumidaGas &&
					cups.gas.DiasFacturadosGas &&
					cups.gas.PrecioTotalGas &&
					cups.gas.PeajeGas) {
					cups.displayprice = "invoice";
				} else {
					cups.displayprice = "CUPS";
				}
				break;
			case "luz-gas":
				const valid1Luz = cups.luz && cups.luz.PrecioTotalLuz ? true : false;
				const valid2Luz = cups.luz && cups.luz.DiasFacturadosLuz ? true : false;
				const valid3Luz = cups.luz && cups.luz.consumoP1 ? true : false;
				let valid4Luz = false;
				if (cups.luz && cups.luz.PotenciasLuz) {
					valid4Luz = cups.luz.PotenciasLuz.potenciaContratadaP1 ? true : false;
				}
				const valid1Gas = cups.gas && cups.gas.PrecioTotalGas ? true : false;
				const valid2Gas = cups.gas && cups.gas.DiasFacturadosGas ? true : false;
				const valid3Gas = cups.gas && cups.gas.EnergiaConsumidaGas ? true : false;
				const valid4Gas = cups.gas && cups.gas.PeajeGas ? true : false;
				if (valid1Luz && valid2Luz && valid3Luz && valid1Gas && valid2Gas && valid3Gas && valid4Luz && valid4Gas) {
					cups.displayprice = "invoice";
				} else {
					cups.displayprice = "CUPS";
				}
				break;
		}
		if (cups.displayprice !== "invoice") {
			const luz = cups.luz && cups.luz.cupsluz ? cups.luz.cupsluz : "";
			const gas = cups.gas && cups.gas.cupsgas ? cups.gas.cupsgas : "";
			cups.luz = {};
			cups.gas = {};
			cups.luz.cupsluz = luz;
			cups.gas.cupsgas = gas;
		}
		//sustituir dataSrv por un objeto del cups
		// this.dataSrv.saveCups(cups);
	}

	validatePhoneNum(num: string): boolean {
		let valid = false;
		if (num.length === 9) {
			if (num.substr(0, 1) === "6" || num.substr(0, 1) === "7") {
				valid = true;
			}
		}
		return valid;
	}
}