interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
    };
}
