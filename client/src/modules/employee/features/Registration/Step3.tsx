// // Step3.tsx
// import { useFormContext } from 'react-hook-form';
// import { required } from '../../../../common/utils/decorators/validators';

// interface Step3Props {
//   isMilitary: boolean | null;
// }

// const Step3: React.FC<Step3Props> = ({isMilitary}) => {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-700">Marital Status & Emergency Contact</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Marital Status Field */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Marital Status:</label>
//           <input
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('maritalStatus', { validate: required('Marital status is required') })}
//           />
//           {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus?.message as string}</p>}
//         </div>

//         {/* Emergency Contact Field */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Emergency Contact:</label>
//           <input
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('emergencyContact', { validate: required('Emergency contact is required') })}
//           />
//           {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact?.message as string}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step3;

import { useFormContext } from "react-hook-form";
import { required } from "../../../../common/utils/decorators/validators";
import { convertToEthiopianDate } from "../../../../common/utils/dateUtils";

interface Step3Props {
  isMilitary: boolean | null;
}

const Step3: React.FC<Step3Props> = ({ isMilitary }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const maritalStatus = watch("maritalStatus");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">
        Marital Status & Emergency Contact
      </h2>

      {/* Marital Status Field */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Marital Status <span className="text-red-500">*</span>:
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("maritalStatus", {
              validate: required("Marital status is required"),
            })}
          >
            <option value="">Select...</option>
            <option value="single">Single</option>
            {!isMilitary && <option value="married">Married</option>}
            {!isMilitary && <option value="widowed">Widowed</option>}
            {!isMilitary && <option value="divorced">Divorced</option>}
          </select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maritalStatus?.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Conditionally Rendered Spouse Information */}
      {maritalStatus === "married" && (
        <>
          <h2 className="text-xl font-bold text-gray-700 mt-6">
            Spouse Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>:
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.firstName", {
                  validate: required("First Name is required"),
                })}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Middle Name (optional):
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.middleName")}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>:
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.lastName", {
                  validate: required("Last Name is required"),
                })}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Date of Birth:
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.dob")}
                onChange={(e) => convertToEthiopianDate(e.target.value)} // convert to Ethiopian date on selection
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>:
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.phoneNumber", {
                  validate: required("Phone Number is required"),
                })}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-700 mt-6">
            Spouse Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Region (optional):
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.address.region")}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Subcity (optional):
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.address.subcity")}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Woreda (optional):
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.address.woreda")}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                House Number (optional):
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.address.houseNumber")}
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Leyu Bota (optional):
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register("spouseInfo.address.leyuBota")}
              />
            </div>
          </div>
        </>
      )}

      {maritalStatus === "divorced" && (
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Divorce Date:
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("divorcedInfo.divorceDate")}
          />
        </div>
      )}

      {/* Emergency Contact Information */}
      <h2 className="text-2xl font-bold text-gray-700 mt-6">
        Emergency Contact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>:
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.info.firstName", {
              validate: required("First Name is required"),
            })}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Middle Name (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.info.middleName")}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>:
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.info.lastName", {
              validate: required("Last Name is required"),
            })}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Relationship <span className="text-red-500">*</span>:
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.info.relationship", {
              validate: required("Relationship is required"),
            })}
          >
            <option value="">Select...</option>
            <option value="parent">Parent</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="sibling">Sibling</option>
            <option value="friend">Friend</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>:
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.info.phoneNumber", {
              validate: required("Phone Number is required"),
            })}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Email (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.info.email")}
          />
        </div>
      </div>

      {/* Emergency Contact Address */}
      <h2 className="text-2xl font-bold text-gray-700 mt-6">
        Emergency Contact Address
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Region (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.address.region")}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Subcity (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.address.subcity")}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Woreda (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.address.woreda")}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            House Number (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.address.houseNumber")}
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Leyu Bota (optional):
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register("emergencyContact.address.leyuBota")}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
