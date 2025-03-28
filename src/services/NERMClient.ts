import { AxiosInstance } from 'axios';
import { AddUserRolePairingsRequest, AddUserRolePairingsResponse, Attribute, DeleteProfileRequest, DeleteUserRequest, DeleteUserResponse, ErrorMessages, ErrorResponse, GetAttributesRequest, GetAttributesResponse, GetProfilesRequest, GetProfilesResponse, GetProfileTypesRequest, GetProfileTypesResponse, GetRolesRequest, GetRolesResponse, GetUserRolePairingsRequest, GetUserRolePairingsResponse, GetUsersRequest, GetUsersResponse, isError, PaginatedData, Profile, ProfileType, RemoveUserRolePairingsRequest, RemoveUserRolePairingsResponse, Role, UpdateUserRequest, UpdateUserResponse, User, UserRole } from '../models/API';

export class NERMClient {
    constructor(private readonly axios: AxiosInstance) {

    }

    public async testConnection() {

        const response = await this.axios.get("users?limit=1", {
            // Don't throw when the status code is 401
            validateStatus: status => (status >= 200 && status < 300) || status === 401
        })

        if (response.status === 401) {
            throw new Error("Invalid API Key");
        }
    }

    /////////////////////////////
    // #region Roles
    /////////////////////////////

    public async getRoles(request: GetRolesRequest): Promise<PaginatedData<Role>> {
        request = {
            order: "name",
            ...request
        }
        const response = await this.axios.get<GetRolesResponse>("roles", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.roles
        }
    }

    /////////////////////////////
    // #endregion Roles
    /////////////////////////////

    /////////////////////////////
    // #region UserRolePairings
    /////////////////////////////

    public async getUserRolePairings(request: GetUserRolePairingsRequest): Promise<PaginatedData<UserRole>> {
        const response = await this.axios.get<GetUserRolePairingsResponse | ErrorResponse>("user_roles", { params: request })
        if (isError(response.data)) {
            // NERM's API returns 200 if there is no user role pair with an error message
            if (response.data.error === ErrorMessages.NO_USER_ROLE) {
                return {
                    _metadata: {
                        limit: 0,
                        offset: 0,
                        total: 0,
                        next: ""
                    },
                    data: []
                }
            }
            throw new Error(response.data.error);
        }
        return {
            _metadata: response.data._metadata,
            data: response.data.user_roles
        }
    }

    public async addUserRolePairings(request: AddUserRolePairingsRequest): Promise<UserRole[]> {
        const response = await this.axios.post<AddUserRolePairingsResponse>("user_roles", request)
        return response.data.user_roles
    }

    public async removeUserRolePairings(request: RemoveUserRolePairingsRequest): Promise<RemoveUserRolePairingsResponse> {
        const response = await this.axios.delete<RemoveUserRolePairingsResponse>(`user_role/${request.id}`)
        return response.data
    }

    /////////////////////////////
    // #endregion UserRolePairings
    /////////////////////////////

    /////////////////////////////
    // #region Users
    /////////////////////////////

    public async getUsers(request: GetUsersRequest): Promise<PaginatedData<User>> {
        const response = await this.axios.get<GetUsersResponse>("users", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.users
        }
    }

    public async updateUser(request: UpdateUserRequest): Promise<User> {
        const response = await this.axios.patch<UpdateUserResponse>(`users/${request.user.id}`, request)
        return response.data.user
    }

    public async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
        const response = await this.axios.delete<DeleteUserResponse>(`users/${request.id}`)
        return response.data
    }

    /////////////////////////////
    // #endregion Users
    /////////////////////////////

    /////////////////////////////
    // #region Profile Types
    /////////////////////////////

    public async getProfileTypes(request: GetProfileTypesRequest): Promise<PaginatedData<ProfileType>> {
        const response = await this.axios.get<GetProfileTypesResponse>("profile_types", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.profile_types
        }
    }

    /////////////////////////////
    // #endregion Profile Types
    /////////////////////////////

    /////////////////////////////
    // #region Attributes
    /////////////////////////////

    public async getAttributes(request: GetAttributesRequest): Promise<PaginatedData<Attribute>> {
        const response = await this.axios.get<GetAttributesResponse>("ne_attributes", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.ne_attributes
        }
    }

    /////////////////////////////
    // #endregion Profiles
    /////////////////////////////


    public async getProfiles(request: GetProfilesRequest): Promise<PaginatedData<Profile>> {
        const response = await this.axios.get<GetProfilesResponse>("profiles", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.profiles
        }
    }
    
    public async deleteProfile(request: DeleteProfileRequest): Promise<void> {
        await this.axios.delete(`profiles/${request.id}`)
    }

    /////////////////////////////
    // #endregion Profiles
    /////////////////////////////

}