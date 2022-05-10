export interface DataTable {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    cin: string;
    phone: string;
    accountNumber: number;
    PIN: number;
    ccn: number;
    balance: number;
    actions?: string;
}

export interface ColumnTable {
    id: 'fName' | 'lName' | 'email' | 'cin' | 'phone' | 'accountNumber' | 'PIN' | 'ccn' | 'balance' | 'actions';
    label: string;

}

export interface PropsTable {
    data: DataTable[];
    columns: ColumnTable[];
}

export interface User {
 
    fName: string;
    lName: string;
    email: string;
    cin: string;
    phone: string;
    accountNumber: number;
    PIN: number;
    ccn: number;
    balance: number;
}