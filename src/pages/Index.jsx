import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Box, Image, Input, SimpleGrid, Card, CardBody, Heading, Stack, HStack, Flex } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = cities.filter((city) => city.city.toLowerCase().includes(searchTerm.toLowerCase()) || city.country.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container maxW="container.xl" p={0}>
      <Box as="nav" bg="teal.500" color="white" p={4}>
        <Text fontSize="2xl" fontWeight="bold">
          NomadRank
        </Text>
      </Box>

      <Box as="section" position="relative" height="300px" display="flex" alignItems="center" justifyContent="center" bg="gray.800">
        <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTcxNTY3MDE0Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Tropical Beach" objectFit="cover" width="100%" height="100%" position="absolute" zIndex={-1} />
        <VStack spacing={4} color="white" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            Discover the Best Cities for Digital Nomads
          </Text>
          <Text fontSize="lg">Find your next destination based on our curated list of cities perfect for remote work.</Text>
        </VStack>
      </Box>

      <Box as="section" p={4}>
        <HStack mb={4}>
          <Input placeholder="Search for a city or country..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <IconButton aria-label="Search" icon={<FaSearch />} />
        </HStack>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {filteredCities.map((city) => (
            <Card key={city.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <CardBody>
                <Stack spacing={2}>
                  <Heading size="md">{city.city}</Heading>
                  <Text>{city.country}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;
