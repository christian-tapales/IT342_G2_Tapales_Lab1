package com.tapales.userauth

import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.*

interface AuthApiService {
    @POST("api/auth/register")
    fun register(@Body user: User): Call<ResponseBody>

    @POST("api/auth/login")
    fun login(@Body user: User): Call<User>

    @GET("api/auth/me")
    fun getCurrentUser(): Call<User>

    @POST("api/auth/logout")
    fun logout(): Call<ResponseBody>
}