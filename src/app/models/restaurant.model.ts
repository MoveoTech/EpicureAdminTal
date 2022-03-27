import { Chef } from "./chefs.model";
import { SignatureDish } from "./signatureDish.model";

export interface Restaurant {
    _id:string,
    name:string,
    image: string,
    isPopular: boolean,
    Chef: Chef,
    signatureDish: SignatureDish
}