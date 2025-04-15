import { Box, Button, Flex, Group, Paper, Stack, Text, Title, } from "@mantine/core"

const HomePage = () => {

  return (
    <>
      <Box style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }} px="md" py="xl">
        <Flex direction="column" align="center" justify="center" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Title order={1} size="h1" mb="md" fw={900}>
            🎤 ArtistFlow: Redefining Artist Management
          </Title>
          <Text size="lg" c="dimmed" mb="xl">
            Welcome to ArtistFlow — a state-of-the-art artist management system designed to streamline workflows for super admins, artist managers, and artists alike. Effortlessly manage users, artists, and songs with powerful admin features, intuitive dashboards, and seamless data handling.
          </Text>

          <Flex wrap="wrap" gap="lg" justify="center">
            <Paper shadow="md" radius="xl" p="lg" withBorder style={{ width: 280 }}>
              <Title order={3} c="blue" mb="sm">
                User Management
              </Title>
              <Stack>
                <Text>CRUD operations for users</Text>
                <Text>Role-based access</Text>
                <Text>Paginated user Listing</Text>
              </Stack>
            </Paper>

            <Paper shadow="md" radius="xl" p="lg" withBorder style={{ width: 280 }}>
              <Title order={3} c="green" mb="sm">
                Artist Management
              </Title>
              <Stack>
                <Text>Paginated artist listing</Text>
                <Text>CRUD access for artist managers</Text>
                <Text>CSV Import/Export support</Text>
                <Text>Song navigation per artist</Text>
              </Stack>
            </Paper>

            <Paper shadow="md" radius="xl" p="lg" withBorder style={{ width: 280 }}>
              <Title order={3} c="violet" mb="sm">
                Song Management
              </Title>
              <Stack>
                <Text>Role-specific song access</Text>
                <Text>Artists can manage their own songs</Text>
                <Text>Super admins & managers can view all songs</Text>
                <Text>Sleek song listing interface</Text>
              </Stack>
            </Paper>
          </Flex>

          <Group mt="xl">
            <Button component="a" href="/login" size="lg" radius="xl">
              Get Started →
            </Button>
          </Group>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage

