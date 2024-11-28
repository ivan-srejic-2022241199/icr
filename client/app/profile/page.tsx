import Header from "@/app/components/header/Header";
import { Flex } from "@mantine/core";
import ProfileContent from "@/app/profile/components/ProfileContent";

const ProfilePage = () => {
  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"}>
      <Header />
      <Flex w={"100%"} h={"100vh"} justify={"center"}>
        <Flex h={"100%"} w={"80%"}>
          <ProfileContent />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
