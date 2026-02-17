package com.tapales.userauth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.tapales.userauth.databinding.ActivityMainBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    // 1. Declare the binding variable
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 2. Initialize ViewBinding before using it
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 3. Handle Login Logic using binding
        binding.btnLogin.setOnClickListener {
            val email = binding.etEmail.text.toString()
            val password = binding.etPassword.text.toString()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Create login request
            val loginRequest = User(email = email, password = password, firstName = "", lastName = "")

            // Use .apiService (not .instance) to match your RetrofitClient object
            RetrofitClient.apiService.login(loginRequest).enqueue(object : Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    if (response.isSuccessful) {
                        val user = response.body()

                        // 1. Create the Intent to move from Login to Dashboard
                        val intent = Intent(this@MainActivity, DashboardActivity::class.java)

                        // 2. "Pack the suitcase" with the User data
                        // The key "USER_DATA" must match what you use to "unpack" it in DashboardActivity
                        intent.putExtra("USER_DATA", user)

                        // 3. Launch the Dashboard
                        startActivity(intent)

                        // 4. Important: Finish MainActivity so the user can't go "back" to the login screen
                        finish()
                    } else {
                        Toast.makeText(this@MainActivity, "Login Failed", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<User>, t: Throwable) {
                    Toast.makeText(this@MainActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }

        // 4. Handle Navigation to RegisterActivity
        binding.tvRegisterLink.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }
}