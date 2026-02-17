package com.tapales.userauth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.tapales.userauth.databinding.ActivityRegisterBinding
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 1. Handle the "Initialize Profile" (Register) Button
        binding.btnRegister.setOnClickListener {
            val firstName = binding.etFirstName.text.toString().trim()
            val lastName = binding.etLastName.text.toString().trim()
            val email = binding.etEmail.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()

            // Basic validation
            if (firstName.isEmpty() || lastName.isEmpty() || email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "All fields are required for clearance.", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Create the User object
            val user = User(
                firstName = firstName,
                lastName = lastName,
                email = email,
                password = password
            )

            // 2. Make the Network Request
            RetrofitClient.apiService.register(user).enqueue(object : Callback<ResponseBody> {
                override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@RegisterActivity, "Profile Initialized. You may log in.", Toast.LENGTH_LONG).show()
                        finish() // Return to Login Screen (MainActivity)
                    } else {
                        Toast.makeText(this@RegisterActivity, "Registration Failed: ${response.code()}", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                    Toast.makeText(this@RegisterActivity, "Network Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }

        // 3. Handle Navigation back to Login
        binding.tvLoginLink.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish() // Optional: remove this activity from the backstack
        }
    }
}