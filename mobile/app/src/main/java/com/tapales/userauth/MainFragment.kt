package com.tapales.userauth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tapales.userauth.databinding.ActivityMainFragmentBinding

class MainFragment : Fragment() {
    private var _binding: ActivityMainFragmentBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Retrieve the user from the arguments bundle (Matches ProfileFragment logic)
        val user = arguments?.getParcelable<User>("USER_DATA")

        user?.let {
            binding.tvWelcomeAgent.text = "WELCOME, AGENT ${it.lastName.toUpperCase()}"
        }
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = ActivityMainFragmentBinding.inflate(inflater, container, false)

        // You can set the Agent name dynamically here later
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}