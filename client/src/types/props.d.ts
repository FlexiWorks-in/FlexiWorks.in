export type Project = {
  _id: string;
  title: string;
  imageUrl?: string | null;
  description: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};
