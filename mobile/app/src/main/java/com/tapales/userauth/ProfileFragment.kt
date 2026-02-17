package com.tapales.userauth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tapales.userauth.databinding.ActivityProfileFragmentBinding

class ProfileFragment : Fragment() {
    private var _binding: ActivityProfileFragmentBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = ActivityProfileFragmentBinding.inflate(inflater, container, false)

        // Populate data (You can pass this from DashboardActivity later)
        binding.tvProfileName.text = "Agent Tapales"
        binding.tvProfileEmail.text = "tapales@cit.edu"

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Retrieve the user from the arguments bundle
        val user = arguments?.getParcelable<User>("USER_DATA")

        user?.let {
            binding.tvProfileName.text = "Agent ${it.firstName} ${it.lastName}"
            binding.tvProfileEmail.text = it.email
        }
    }

}