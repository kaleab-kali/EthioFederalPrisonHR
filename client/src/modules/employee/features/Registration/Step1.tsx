import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { required } from "../../../../common/utils/decorators/validators";

// Define types for the cascading dropdown data
interface RegionData {
  [key: string]: string[];
}

interface WoredaData {
  [key: string]: string[];
}

// Dummy data for cascading dropdowns
const regionData: RegionData = {
  "Region 1": ["Subcity 1A", "Subcity 1B"],
  "Region 2": ["Subcity 2A", "Subcity 2B"],
};

const woredaData: WoredaData = {
  "Subcity 1A": ["Woreda 1A1", "Woreda 1A2"],
  "Subcity 1B": ["Woreda 1B1", "Woreda 1B2"],
  "Subcity 2A": ["Woreda 2A1", "Woreda 2A2"],
  "Subcity 2B": ["Woreda 2B1", "Woreda 2B2"],
};

// Dummy data for dropdowns
const positionOptions = ["Manager", "Engineer", "Technician", "HR"];
const departmentOptions = ["Sales", "Marketing", "IT", "HR"];
const ethnicityOptions = ["Amhara", "Oromo", "Tigray", "Somali"];
const genderOptions = ["Male", "Female", "Other"];

interface Step1Props {
  isMilitary: boolean | null;
}

const Step1: React.FC<Step1Props> = ({ isMilitary }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubcity, setSelectedSubcity] = useState<string>("");

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRegion(value);
    setSelectedSubcity(""); // Reset subcity when region changes
  };

  const handleSubcityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcity(e.target.value);
  };

  // Function to get error message from nested objects
  const getErrorMessage = (field: string) => {
    const errorField = field
      .split(".")
      .reduce((prev, curr) => prev?.[curr], errors as Record<string, any>);
    return errorField?.message;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Basic Information</h2>

      {/* Title Field */}
      <div className="form-group">
        <label className="block font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-1 block w-100 border border-gray-300 rounded-md shadow-sm px-3"
          {...register("title", { validate: required("Title is required") })}
        >
          {isMilitary ? (
            <>
              <option value="Private">Private</option>
              <option value="Sergeant">Sergeant</option>
              <option value="Lieutenant">Lieutenant</option>
              <option value="Captain">Captain</option>
            </>
          ) : (
            <>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </>
          )}
        </select>
        {getErrorMessage("title") && (
          <p className="text-red-500 text-sm mt-1">
            {getErrorMessage("title")}
          </p>
        )}
      </div>

      {/* Personal Info Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
            {...register("firstName", {
              validate: required("First name is required"),
            })}
          />
          {getErrorMessage("firstName") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("firstName")}
            </p>
          )}
        </div>

        {/* Middle Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Middle Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
            {...register("middleName", {
              validate: required("Middle name is required"),
            })}
          />
          {getErrorMessage("middleName") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("middleName")}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
            {...register("lastName", {
              validate: required("Last name is required"),
            })}
          />
          {getErrorMessage("lastName") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("lastName")}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Age <span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("age", { validate: required("Age is required") })}
          />
          {getErrorMessage("age") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("age")}
            </p>
          )}
        </div>

        {/* Height */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("height", {
              validate: required("Height is required"),
            })}
          />
          {getErrorMessage("height") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("height")}
            </p>
          )}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Weight (kg) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("weight", {
              validate: required("Weight is required"),
            })}
          />
          {getErrorMessage("weight") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("weight")}
            </p>
          )}
        </div>

        {/* Position Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Position <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("position", {
              validate: required("Position is required"),
            })}
          >
            <option value="">Select Position</option>
            {positionOptions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
          {getErrorMessage("position") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("position")}
            </p>
          )}
        </div>

        {/* Department Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("department", {
              validate: required("Department is required"),
            })}
          >
            <option value="">Select Department</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {getErrorMessage("department") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("department")}
            </p>
          )}
        </div>

        {/* Photo Upload */}
        {/* <div className="form-group">
          <label className="block font-medium text-gray-700">
            Photo <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('photo', { validate: required('Photo is required') })}
          />
          {getErrorMessage('photo') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('photo')}</p>}
        </div> */}

        {/* Ethnicity Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Ethnicity <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("ethnicity", {
              validate: required("Ethnicity is required"),
            })}
          >
            <option value="">Select Ethnicity</option>
            {ethnicityOptions.map((eth) => (
              <option key={eth} value={eth}>
                {eth}
              </option>
            ))}
          </select>
          {getErrorMessage("ethnicity") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("ethnicity")}
            </p>
          )}
        </div>

        {/* Gender Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("gender", {
              validate: required("Gender is required"),
            })}
          >
            <option value="">Select Gender</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {getErrorMessage("gender") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("gender")}
            </p>
          )}
        </div>

        {/* Birthday */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Birthday <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("birthday", {
              validate: required("Birthday is required"),
            })}
          />
          {getErrorMessage("birthday") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("birthday")}
            </p>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label className="block font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value="+251"
            readOnly
            className="mt-1 block w-10 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="mt-1 block w-150 px-3 border border-gray-300 rounded-md shadow-sm"
            {...register("phoneNumber.number", {
              validate: required("Phone number is required"),
            })}
          />
        </div>
        {getErrorMessage("phoneNumber.number") && (
          <p className="text-red-500 text-sm mt-1">
            {getErrorMessage("phoneNumber.number")}
          </p>
        )}
      </div>

      {/* Current Address Section */}
      <h3 className="text-lg font-medium text-gray-700 mt-4">
        Current Address
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {/* Region Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Region <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("currentAddress.region", {
              validate: required("Region is required"),
            })}
            onChange={handleRegionChange}
          >
            <option value="">Select Region</option>
            {Object.keys(regionData).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {getErrorMessage("currentAddress.region") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("currentAddress.region")}
            </p>
          )}
        </div>

        {/* Subcity Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Subcity <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("currentAddress.subcity", {
              validate: required("Subcity is required"),
            })}
            onChange={handleSubcityChange}
            disabled={!selectedRegion}
          >
            <option value="">Select Subcity</option>
            {selectedRegion &&
              regionData[selectedRegion]?.map((subcity) => (
                <option key={subcity} value={subcity}>
                  {subcity}
                </option>
              ))}
          </select>
          {getErrorMessage("currentAddress.subcity") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("currentAddress.subcity")}
            </p>
          )}
        </div>

        {/* Woreda Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Woreda <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("currentAddress.woreda", {
              validate: required("Woreda is required"),
            })}
            disabled={!selectedSubcity}
          >
            <option value="">Select Woreda</option>
            {selectedSubcity &&
              woredaData[selectedSubcity]?.map((woreda) => (
                <option key={woreda} value={woreda}>
                  {woreda}
                </option>
              ))}
          </select>
          {getErrorMessage("currentAddress.woreda") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("currentAddress.woreda")}
            </p>
          )}
        </div>

        {/* House Number Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            House Number <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("currentAddress.houseNumber", {
              validate: required("House number is required"),
            })}
          />
          {getErrorMessage("currentAddress.houseNumber") && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage("currentAddress.houseNumber")}
            </p>
          )}
        </div>

        {/* Leyu Bota Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Leyu Bota (if applicable)
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("currentAddress.leyuBota")}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
