import {JsonService} from "src/services/json.service";

export const RestService = {
    getUsers: () => JsonService.get('users'),


};
