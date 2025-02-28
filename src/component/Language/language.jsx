import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { languageChange } from '../../reduxToolkit/languageSlice';
import {languageList} from "./data";
import {IoMdArrowDropdown} from "react-icons/io";
import {CiGlobe} from "react-icons/ci";
import "./style.scss"
const Language = () => {
    const dispatch = useDispatch();
    const [activeLang, setActiveLang] = useState(false);
    const language = useSelector((state) => state.language.language);

    useEffect(() => {
        if (!i18next.isInitialized) {
            const handleInitialization = () => {
                i18next.changeLanguage(language).catch((error) => {
                });
            };

            i18next.on('initialized', handleInitialization);

            // Clean up listener
            return () => {
                i18next.off('initialized', handleInitialization);
            };
        } else {
            i18next.changeLanguage(language).catch((error) => {
            });
        }
    }, [language]);

    const handleChangeLng = (lng) => {
        if (!i18next.isInitialized) {
            return;
        }

        i18next.changeLanguage(lng)
            .then(() => {
                dispatch(languageChange(lng));
                setActiveLang((prev) => !prev);
            })
            .catch((error) => {
            });
    };

    return (
        <div className="language">
            <div className="language-wrapper" onClick={() => setActiveLang((prev) => !prev)}>
                <CiGlobe className="language-icon" />
                <span className="language-lan">
                    {languageList.find((lan) => lan.type === language)?.label}
                </span>
                <IoMdArrowDropdown className="language-iconArrow" />
            </div>
            <div className="language-bar" style={activeLang ? { display: "flex" } : null}>
                {languageList.map((el, index) => (
                    <p key={index} onClick={() => handleChangeLng(el.type)}>
                        {el.label}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Language;
