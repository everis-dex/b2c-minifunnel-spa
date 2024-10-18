
export enum StepStatus {
  Done = 'done',
  InProgress = 'inProgress',
  NotStarted = 'notStarted',
}

// CURRENT FUNNEL

export interface Language {
  value: string;
  viewValue: string;
}

export interface  Cups {
  type?: string;
  typeSelected?: string;
  displayprice?: string;
  idOferta?: string;
  gas?: GasCups;
  luz?: LuzCups;
  Partner?: string;
  IdOferta?: string;
  IdProducto?: string;
  flow?: string;
  suministro_existente?: string;
  numProducto?: string;
}

export interface GasCups {
  cupsgas?: string;
  PrecioTotalGas?: string;
  DiasFacturadosGas?: string;
  EnergiaConsumidaGas?: string;
  Householdsize?: string;
  Heatinggas?: string;
  Hotwatergas?: string;
  House?: string;
  apartment?: string;
  PeajeGas?: string;
  FechaGas?: string;
}

export interface LuzCups {
  cupsluz?: string;
  PrecioTotalLuz?: string;
  DiasFacturadosLuz?: string;
  EnergiaconsumidaLuz?: Array<ConsumedEnergy>;
  Householdsize?: string;
  Heatingelec?: string;
  Hotwaterelec?: string;
  Electricvehicle?: string;
  House?: string;
  HourlyDiscrimination?: string;
  apartment?: string;
  PeajeLuz?: string;
  PotenciasLuz?: PotenciasLuz;
  consumoP1?: number;
  FechaLuz?: string;
}

export interface PotenciasLuz{
  potenciaContratadaP1?: string;
  potenciaContratadaP2?: string;
  potenciaContratadaP3?: string;
}


export interface ConsumedEnergy {
  EnergiaConsumida?: number;
  Time_discrimination_type?: string;
}

export interface Invoice {
  name: string;
  url: string;
}

export interface FormDataPopUp {
  nameSurname?: string;
  mail?: string;
  phone?: string;
  help?: string;
  affair?: string;
  path?: string;
  address?: string;
}

export interface FormData {
  idNum?: string;
  name?: string;
  surname?: string;
  phone?: number;
  mail?: string;
  confirmMail?: string;
  postCode?: string;
  municipality?: string;
  province?: string;
  town?: string;
  address?: string;
  addressNum?: string;
  aptNum?: string;
  iban?: string;
  roadType?: string;
  door?: string;
  discountclick?: boolean;
  funcionaClima?: boolean;
  funciona?: boolean;
  funciona2?: boolean;
  Cambio_titular?: boolean;
  idRegistro?: string;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  check6: boolean;
  checkAltaDatadis: boolean;
  checkVisDatSumi: boolean;
  // descuentoAplicado: any;
  // digitalProductSelected: any;
  // productSelected: any;
  // productGasSelected: any;
  // facilitaSelected?: any;
  facilitaPRD?: CPQProduct;
}
export interface ContratosPotenciales {
  recaptcha?: string;
  IdOferta?: string;
  IdProducto?: string;
  Nombre_Titular?: string;
  Apellidos_Titular?: string;
  DNI_CIF_Titular?: string;
  Telefono_pref_1?: string;
  Idioma?: string;
  Provincia_PS?: string;
  Municipio_PS?: string;
  Poblacion_PS?: string;
  Tipo_Via_PS?: string;
  Calle_PS?: string;
  Numero_PS?: string;
  Piso_PS?: string;
  Puerta?: string;
  idRegistro?: string;
  Cod_Postal_PS?: string;
  Cambio_titular?: string;
  Contrata_Opcion_Clima?: string;
  Correo_electron?: string;
  Cuenta_Bancaria?: string;
  CONSENTIM_IMPLICITO_RGPD?: string;
  EXPL_ABAND_PROD_TIT?: string;
  EXPL_PERFLD_TIT?: string;
  EDP_Click?: string;
  CostChangeDH?: string;
  Partner?: string;
  Partner_present?: string;
  // Partner_fields: any;
  Alta_directa?: AltaDirecta;
  Suministro_existente?: string;
  cupsLuz?: string;
  cupsGas?: string;
  CONSEN_TOTAL_ALTA_DATADIS?: string;
  CONSEN_TOTAL_VIS_DAT_SUMI?: string;
  descuentoAplicado?: string;
  facilitaSelected?: CPQProduct;
  productSelected?: CPQProduct;
  productGasDualSelected?: CPQProduct;
  productDigital?: CPQProduct;

  // allOffer?: any;
  // allCups?: any;
  // allPartner?: any;
  // allAltaDirecta?: any;
  // allSubmission?:any;
  // allLead?:any;
  AdmissionTypeLight__c?:string;
  checkedOwner?: boolean;
}
export interface Offers {
  twoProducts?: string;
  IdOferta?: string;
  OfferFound?: string;
  Type?: string;
  Displayprice?: string;
  PricePreviousInvoice?: string;
  Saving: number;
  Producto1?: Product[];
  Producto2?: Product[];
  Discountclick?: Discountclick;
  DiscountClima?: string;
  Tarifagas?: string;
  Tarifaluz?: string;
  PrecioClima?: string;
  P1?: number;
  P2?: number;
  P3?: number;
}

export interface Product {
  IdProducto?: string;
  StatusProducto?: string;
  NombreProducto?: string;
  PrecioTotal?: number;
  PrecioLuz?: number;
  Preciogas?: number;
  ElecEnergiaP1?: number;
  ElecEnergiaP2?: number;
  ElecEnergiaP3?: number;
  ElecP1?: string;
  ElecP2?: string;
  ElecP3?: string;
  GasEnergiaP2?: number;
  GasP2?: number;
  Different_funcionas?: DifferentFuncionas[];
  DiscountPercentFunciona: string;
  DiscountOnlineLuz: string;
  DiscountOnlineGas: string;
  DiscountLuzDual: string;
  BonusLuz: number;
  BonusGas: number;
  BonusLuzFun: number;
  BonusGasFun: number;
  BonusTotalFun: string;
  Tarifaluz: string;
  Tarifagas: string;
  DiscountGasVar: string;
  BonusTotal: number;
}

export interface DifferentFuncionas {
  IdProducto?: string;
  NombreProducto?: string;
  PrecioTotal?: number;
  PrecioFunciona?: string;
  DiscountFunciona?: string;
}

export interface Discountclick {
  discountenergia?: number;
  discountfunciona?: number;
}

export interface C2C {
  recaptcha?: string;
  Flow?: string;
  Partner: string;
  // Partner_fields?: Array<any>;
  ScanID?: string;
  Privacy?: string;
  IdOferta?: string;
  IdProducto?: string;
  Nombre?: string;
  Telefono?: string;
  Asunto?: string;
  Legal_text?: string;
  is_client?: boolean;
  // lead?: any;
}

export interface AltaDirecta {
  Suministro_existente?: string; // SI si tiene suministro activo para TODAS las energia, NO si no tiene
  Alta_directa_luz?: string; // SI si no tiene suministro activo para LUZ, NO si tiene
  Alta_directa_gas?: string; // SI si no tiene suministro activo para GAS, NO si tiene
  Alta_nueva_luz?: string; // SI si quiere una conexion totalmente nueva, NO si quiere reactivar una conexion existente
  PotenciaP1?: string;
  PotenciaP2?: string;
  Cups_luz?: string;
  Cups_gas?: string;
  Certificado_luz?: string;
  noCups?: boolean;
}
export interface ProductFlow {
  PotenciaP1?: string;
  PotenciaP2?: string;
  idProduct?: string;
  partner: string;
}


export interface Variant {
  variant: string;
  minChance: number;
  maxChance: number;
  url: {
    t: number;
  };
}

export interface Experiment {
  name: string;
  variants: Variant[];
  selected: Variant;
}

export interface gtmTag {
	url: string;
	partner: string;
	flow?: string;
	type?: string;
	funnel: string;
	ad?: string;
	product?: string;
}

// interfaces for new productos from CPQ

export interface OfferCQP {
  twoProducts?: string;
  Session_ID?: string;
  IdOferta?: string;
  OfferFound?: string;
  Type?: string;
  DisplayPrice?: string;
  PricePreviousInvoice?: string;
  Saving?: number;
  products: CPQProduct[];
  productsToOffer: CPQProduct[];
  digitalProducts: CPQProduct[];
  facilitaProducts: CPQProduct[];
  voucherProducts: CPQProduct[];
}

export interface PotenciasContratadas {
  P1: string;
  P2: string;
  P3: string;
}

export interface CPQProduct {
  productcode: string;
  productname: string;
  catalog: string;
  image: string;
  more?: string;
  Tarifagas?: string;
  Tarifaluz?: string;
  StatusProducto: string;
  // prices: Prices;
  vouchers: CPQProduct[];
  PotenciasContratadas?: PotenciasContratadas;
  facilitas: Facilitas;
  facilita?: string;
}

export interface Facilitas {
  [key : string]: CPQProduct;
}

// interface Prices {
//   Descuento?: string;
//   PrecioLuz?: number;
//   Preciogas?: number;
//   PrecioGas?: number;
//   PrecioLuzConFacilita?: number;
//   PreciogasConFacilita?: number;
//   PrecioGasConFacilita?: number;
//   imageDescription?: string;
//   [key : string]: string | number | Price;
// }

export interface Price {
  withoutTaxes: number
  withTaxes: number
}
export interface Lead {
  Message?: string;
  // SF?: any;
}

export interface partnerFlow {
  title: string,
  flow: string,
  title_noinvoice: string,
  text_default: string,
  text_nocups: string,
  card: Card[]
}

export interface Card {
  invoice: FlowInvoice,
  cups: FlowCups,
  simulator: FlowSimulator
}

export interface FlowInvoice {
  textCard: string,
  subtextCard: string,
  button?: string,
}

export interface FlowCups {
  textCard: string,
  subtextCard: string,
}

export interface FlowSimulator {
  textCard: string,
  subtextCard: string,
}