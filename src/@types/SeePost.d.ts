type SeePost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    id: string;
    user: string;
    data: number;
    title: string;
    description?: string;
    files?: string[];
  };
};
