function calculateOptimizedRoute(customers) {
  // Adiciona o ponto de partida (empresa) ao início da lista
  customers.unshift({ coordx: 0, coordy: 0 })

  // Função para calcular a distância entre dois pontos
  function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.coordx - point1.coordx, 2) + Math.pow(point2.coordy - point1.coordy, 2))
  }

  // Função para calcular a distância total da rota
  function calculateTotalDistance(route) {
    let totalDistance = 0
    for (let i = 1; i < route.length; i++) {
      totalDistance += calculateDistance(route[i - 1], route[i])
    }
    return totalDistance
  }

  // Função para trocar dois elementos em uma lista
  function swapElements(list, i, j) {
    const temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }

  // Algoritmo de força bruta para calcular a rota otimizada
  function bruteForceTSP(points) {
    let minDistance = Infinity
    let minRoute = []

    function permuteRoute(route, start) {
      if (start === route.length - 1) {
        const currentDistance = calculateTotalDistance(route)
        if (currentDistance < minDistance) {
          minDistance = currentDistance
          minRoute = route.slice(); // Copia a rota para evitar referências
        }
      }

      for (let i = start; i < route.length; i++) {
        swapElements(route, start, i)
        permuteRoute(route, start + 1)
        swapElements(route, start, i); // Desfaz a troca para explorar outras opções
      }
    }

    permuteRoute(points, 1); // Começa a permutação a partir do segundo ponto (o primeiro é a empresa)

    return minRoute
  }

  // Calcula a rota otimizada
  const optimizedRoute = bruteForceTSP(customers)

  // Remove o ponto de partida (empresa) da rota final
  optimizedRoute.shift()

  return optimizedRoute
}

module.exports = { calculateOptimizedRoute }
