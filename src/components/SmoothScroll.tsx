"use client"

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Add smooth scrolling behavior to the entire page
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 12px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, rgba(141, 66, 236, 0.8), rgba(96, 163, 249, 0.8));
        border-radius: 6px;
        border: 2px solid rgba(0, 0, 0, 0.2);
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #8D42EC, #60A3F9);
        box-shadow: 0 0 10px rgba(141, 66, 236, 0.5);
      }
    `
    document.head.appendChild(style)

    // Enhanced smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const targetId = target.getAttribute('href')?.substring(1)
        const targetElement = document.getElementById(targetId || '')
        
        if (targetElement) {
          const headerOffset = 80 // Account for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      document.head.removeChild(style)
    }
  }, [])

  return null
} 