export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Project = {
  _id: string;
  title: string;
  imageUrl?: string;
  description: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
};
export type Comment = {
  _id?: string;
  content: string;
  projectId: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
};
