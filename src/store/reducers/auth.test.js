import * as actionTypes from '../actions/actionTypes';
import authReducer      from './auth';

describe("auth reducer", () => {
    it("should return the initial state", () => {
        expect(authReducer(undefined, {})).toEqual({
            token:        null,
            userId:       null,
            errorMessage: null,
            loading:      false,
            isLoggedIn:   false,
            redirectPath: "/"
        });
    });
    it("should store the token upon login", () => {
        expect(authReducer({
            token:        null,
            userId:       null,
            errorMessage: null,
            loading:      false,
            isLoggedIn:   false,
            redirectPath: "/"
        }, {
            type:       actionTypes.AUTH_SUCCESS, 
            token:      "tokenId",
            userId:     "userId"
        }))
        .toEqual({
            token:        "tokenId",
            userId:       "userId",
            errorMessage: null,
            loading:      false,
            isLoggedIn:   true,
            redirectPath: "/"
        });
    });
})