import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '47679503-b117-4c49-a982-fa8815f227dc'
    }
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId = 2) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId = 2) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    auth() {
        return instance.get('auth/me')
            .then(response => {
                return response.data
            })
    }
}