
export const scrollTo = (href) => {
  document.querySelector(href).scrollIntoView({
    behavior: "smooth",
  });
};
