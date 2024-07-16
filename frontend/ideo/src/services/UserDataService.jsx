// this service layer allows interacting with the local database via the backend server

// hook for actually fetching the data from the database
import useDatabase from "../hooks/useDatabase";

const API_ENDPOINT = "http://localhost:8080/api/users";

export default class UserDataService {
    constructor() { };

    static createUser = (user) => {
    }

    static getUsers = () => {
        const localUsers = useDatabase(API_ENDPOINT);
        console.log(localUsers);
    }

    static getUserById = (id) => {

    }

    static getUserByEmail = (email) => {
        // note this hook has some useful state flags like error and loading indicators
        const user = useDatabase(API_ENDPOINT + `?email=${email}`);
        console.log(user);
    }

    static updateUserById = (id) => {

    }

    static deleteUserById = (id) => {

    }
}