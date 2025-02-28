import { useState } from "react";
import styles from "./Accordion.module.scss";

interface AccordionProps {
  isShow: boolean; // Указываем тип для пропса isShow
}

const Accordion: React.FC<AccordionProps> = ({ isShow }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number): void => { // Типизируем index как number
    setOpenIndex(openIndex === index ? null : index);
  };

  const menuItems = [
    {
      title: "Home",
      link: "#",
      subItems: ["Home Demo - 1", "Home Demo - 2", "Home Demo - 3"],
    },
    {
      title: "Blog",
      link: "#",
      subItems: [
        "About Us",
        "Our Team",
        "Our Team Details",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    },
    {
      title: "Courses",
      link: "#",
      subItems: [
        "Courses Grid",
        "Courses List",
        "Courses Details",
        "Courses With Sidebar",
      ],
    },
    {
      title: "Blog",
      link: "#",
      subItems: [
        "Blog Standart",
        "Blog Details",
        "Blog With Sidebar",
        "Blog Without Sidebar",
      ],
    },
    {
      title: "Contacts",
      link: "#",
      subItems: [],
    },
  ];

  return (
    <div
      className={styles.accordion}
      style={isShow ? { maxHeight: "1000px", zIndex: '999', cursor: "pointer" } : {}}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          style={!isShow ? { opacity: "0" } : {}}
          className={styles.accordionItem}
        >
          <div
            className={`${styles.accordionHeader} ${
              openIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <span className={styles.icon}>
              {openIndex === index ? "-" : "+"}
            </span>
          </div>
          <div
            className={`${styles.accordionContent} ${
              openIndex === index ? styles.show : ""
            }`}
          >
            {isShow &&
              item.subItems.map((subItem, subIndex) => (
                <a
                  href={item.link} // передаем правильную ссылку
                  key={subIndex}
                  className={styles.subItem}
                >
                  {subItem}
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
