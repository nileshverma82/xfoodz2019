import * as firebase from 'firebase';

export interface Fooditem {
    id: string;
    createdAt?: Date;
    createdBy?: { id: string, name: string, photoUrl: string };
    isModified?: boolean;
    modifiedAt?: Date;
    geoInfoFromAppUser?: boolean;
    // <product form fields>
    title?: string;
    description?: string;
    currency?: string;
    price?: number;
    serving?: number;
    isNonVeg?: boolean;
    category?: string;
    cuisine?: string;
    orderType?: string;
    orderTime?: string;
    availability?: string[];
    deliveryTime?: string;
    cashOnDelivery?: boolean;
    onlinePayment?: boolean;
    takeAway?: boolean;
    homeDelivery?: boolean;
    dineIn?: boolean;
    //geoInfo?: IGeoInfo;
    // </product form fields>
    images?: { path: string, url: string }[];
}