package com.tapales.userauth

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class User(
    val id: Long? = null,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String? = null
) : Parcelable