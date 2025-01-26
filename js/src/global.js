export const getIsoDate = () => {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Construct the date string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000000`;
};

export const getFormattedDate = () => {
  return {
    date: getIsoDate(),
    timezone_type: 3, // Indicates the type of timezone representation
    timezone: "UTC",
  };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
