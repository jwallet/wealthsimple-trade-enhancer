export const getAccountId = (pathname: string) => {
  const urlSections = pathname.split("/");
  const id = urlSections[urlSections.length - 1];
  return id;
};
