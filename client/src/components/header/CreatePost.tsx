import { auth } from "@/auth";
import { Button } from "@chakra-ui/react";

async function CreatePost() {
  const session = await auth();
  if (!session) return null;
  return (
    <Button type="submit" variant={"primary"}>
      Create Post
    </Button>
  );
}

export default CreatePost;
