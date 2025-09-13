import { useState, useEffect } from 'react'

// Hook para prevenir problemas de hidratação
export function useClientOnly() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

// Hook para valores aleatórios consistentes
export function useSeededRandom(seed: string) {
  const [values, setValues] = useState<number[]>([])
  
  useEffect(() => {
    // Simple seeded random function
    let seedValue = 0
    for (let i = 0; i < seed.length; i++) {
      seedValue = seedValue + seed.charCodeAt(i)
    }
    
    const random = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280
      return seedValue / 233280
    }
    
    // Generate 100 consistent random values
    const randomValues = Array.from({ length: 100 }, () => random())
    setValues(randomValues)
  }, [seed])
  
  return (index: number) => values[index % values.length] || 0
}

// Hook para animações que devem só rodar no cliente
export function useClientAnimation<T>(initialValue: T, animatedValue: T) {
  const hasMounted = useClientOnly()
  return hasMounted ? animatedValue : initialValue
}