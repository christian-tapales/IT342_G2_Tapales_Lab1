package com.tapales.userauth

import android.widget.Toast
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import com.tapales.userauth.databinding.ActivityDashboardBinding
import okhttp3.ResponseBody

class DashboardActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDashboardBinding
    private var currentUser: User? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        currentUser = intent.getParcelableExtra("USER_DATA")
        // Toggle for Sidebar
        val toggle = ActionBarDrawerToggle(this, binding.drawerLayout, binding.toolbar, R.string.open, R.string.close)
        binding.drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        // Verify Session (The React useEffect equivalent)
        verifyAgentSession()

        binding.navView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_main -> showMainDashboard()
                R.id.nav_profile -> showProfile()
                R.id.nav_logout -> handleLogout()
            }
            binding.drawerLayout.closeDrawers()
            true
        }
    }

    private fun showMainDashboard() {
        val fragment = MainFragment()
        // Create a bundle and put the currentUser object inside
        val bundle = Bundle()
        bundle.putParcelable("USER_DATA", currentUser)
        fragment.arguments = bundle
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment) // Matches the FrameLayout ID in activity_dashboard.xml
            .commit()
    }

    private fun showProfile() {
        val fragment = ProfileFragment()

        // Pass data to Fragment using a Bundle
        val bundle = Bundle()
        bundle.putParcelable("USER_DATA", currentUser)
        fragment.arguments = bundle

        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .addToBackStack(null) // Allows user to use 'Back' button to return to Main
            .commit()
    }

    private fun verifyAgentSession() {
        // Start with the overlay visible (set in XML)

        RetrofitClient.apiService.getCurrentUser().enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful) {
                    // UPDATE THE DATA: Save the fresh user data from the server
                    currentUser = response.body()
                    // Success! Hide the scanning screen
                    binding.loadingOverlay.visibility = View.GONE
                    showMainDashboard()
                } else {
                    // Session invalid - Kick to login
                    startActivity(Intent(this@DashboardActivity, MainActivity::class.java))
                    finish()
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(this@DashboardActivity, "Connection Lost", Toast.LENGTH_SHORT).show()
                // Keep the overlay visible or show a retry button
            }
        })
    }

    private fun handleLogout() {
        RetrofitClient.apiService.logout().enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                startActivity(Intent(this@DashboardActivity, MainActivity::class.java))
                finish()
            }
            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {}
        })
    }
}