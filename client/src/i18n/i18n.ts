// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import common_en from "./en/common.json";
import common_am from "./am/common.json";

import adminPassChange_en from "./en/adminPasswordManager.json";
import employeeRole_en from "./en/employeeRoleAssignment.json";
import header_en from "./en/header.json";
import sider_en from "./en/sidebar.json";
import transfer_en from "./en/transfer.json";




import adminPassChange_am from "./am/adminPasswordManager.json";
import employeeRole_am from "./am/employeeRoleAssignment.json";
import header_am from "./am/header.json";
import sider_am from "./am/sidebar.json";
import transfer_am from "./am/transfer.json";



// Define translations by page/section
const resources = {
  en: {
    common: common_en,
    sider: sider_en,
    header: header_en,
    adminPassChange: adminPassChange_en,
    employeeRole: employeeRole_en,
    transfer: transfer_en,
  },
  am: {
    commen: common_am,
    sider: sider_am,
    header: header_am,
    adminPassChange: adminPassChange_am,
    employeeRole: employeeRole_am,
    transfer: transfer_am,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
    
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  ns: ["common","employeeRole", "adminPassChange","header","sider","transfer"], // Define namespaces
  defaultNS: "common",
  fallbackNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
