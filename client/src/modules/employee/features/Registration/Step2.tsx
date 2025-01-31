// // Step2.tsx
// import { useFormContext } from 'react-hook-form';
// import { required } from '../../../../common/utils/decorators/validators';

// const Step2: React.FC = () => {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-700">Salary & Education</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Salary Field */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Salary:</label>
//           <input
//             type="number"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('salary', { 
//               validate: {
//                 required: required('Salary is required'),
//                 isNumber: (value) => (!isNaN(value) ? true : 'Salary must be a number'),
//                 min: (value) => (value >= 1000 ? true : 'Salary must be at least 1000'),
//               }
//             })}
//           />
//           {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary?.message as string}</p>}
//         </div>

//         {/* Education Field */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Education:</label>
//           <input
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('education')}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2;


// import { useFormContext } from 'react-hook-form';

// // Define TypeScript interfaces for the form structure
// interface Education {
//   fieldofstudy: string;
//   institution: string;
//   graduationYear: number;
//   educationLevel: string;
// }

// interface PhoneNumber {
//   prefix: string;
//   number: string;
// }

// interface MotherInformation {
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   phoneNumber: PhoneNumber;
// }

// interface FormValues {
//   salary: number;
//   education: Education;
//   motherInformation: MotherInformation;
// }

// const Step2: React.FC = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext<FormValues>(); // Ensure TypeScript knows the form structure

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-700">Salary & Education</h2>

//       {/* Salary Field */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Salary:</label>
//           <input
//             type="number"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('salary', {
//               required: 'Salary is required',
//               min: { value: 1000, message: 'Salary must be at least 1000' },
//             })}
//           />
//           {errors.salary && (
//             <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Education Information */}
//       <h3 className="text-xl font-bold text-gray-700">Education</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Field of Study */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Field of Study:</label>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('education.fieldofstudy', { required: 'Field of study is required' })}
//           />
//           {errors.education?.fieldofstudy && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.education.fieldofstudy.message}
//             </p>
//           )}
//         </div>

//         {/* Institution */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Institution:</label>
//           <select
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('education.institution', { required: 'Institution is required' })}
//           >
//             <option value="">Select Institution</option>
//             <option value="Addis Ababa University">Addis Ababa University</option>
//             <option value="Harvard University">Harvard University</option>
//             <option value="Oxford University">Oxford University</option>
//           </select>
//           {errors.education?.institution && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.education.institution.message}
//             </p>
//           )}
//         </div>

//         {/* Graduation Year */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Graduation Year:</label>
//           <input
//             type="number"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('education.graduationYear', {
//               required: 'Graduation year is required',
//               min: { value: 1900, message: 'Graduation year must be after 1900' },
//               max: { value: new Date().getFullYear(), message: 'Graduation year cannot be in the future' },
//             })}
//           />
//           {errors.education?.graduationYear && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.education.graduationYear.message}
//             </p>
//           )}
//         </div>

//         {/* Education Level */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Education Level:</label>
//           <select
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('education.educationLevel', { required: 'Education level is required' })}
//           >
//             <option value="">Select Education Level</option>
//             <option value="Bachelor's Degree">Bachelor's Degree</option>
//             <option value="Master's Degree">Master's Degree</option>
//             <option value="Doctorate">Doctorate</option>
//           </select>
//           {errors.education?.educationLevel && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.education.educationLevel.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Mother's Information */}
//       <h3 className="text-xl font-bold text-gray-700 mt-6">Mother's Information</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Mother's First Name */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">First Name:</label>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('motherInformation.firstName', {
//               required: 'Mother\'s first name is required',
//             })}
//           />
//           {errors.motherInformation?.firstName && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.motherInformation.firstName.message}
//             </p>
//           )}
//         </div>

//         {/* Mother's Middle Name */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Middle Name:</label>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('motherInformation.middleName', {
//               required: 'Mother\'s middle name is required',
//             })}
//           />
//           {errors.motherInformation?.middleName && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.motherInformation.middleName.message}
//             </p>
//           )}
//         </div>

//         {/* Mother's Last Name */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Last Name:</label>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('motherInformation.lastName', {
//               required: 'Mother\'s last name is required',
//             })}
//           />
//           {errors.motherInformation?.lastName && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.motherInformation.lastName.message}
//             </p>
//           )}
//         </div>

//         {/* Mother's Phone Prefix */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Phone Prefix:</label>
//           <select
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('motherInformation.phoneNumber.prefix', {
//               required: 'Phone prefix is required',
//             })}
//           >
//             <option value="">Select Prefix</option>
//             <option value="+251">+251</option>
//           </select>
//           {errors.motherInformation?.phoneNumber?.prefix && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.motherInformation.phoneNumber.prefix.message}
//             </p>
//           )}
//         </div>

//         {/* Mother's Phone Number */}
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Phone Number:</label>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('motherInformation.phoneNumber.number', {
//               required: 'Phone number is required',
//             })}
//           />
//           {errors.motherInformation?.phoneNumber?.number && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.motherInformation.phoneNumber.number.message}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2;


import { useFormContext, useFieldArray } from 'react-hook-form';
import { useTranslation } from "react-i18next";

// Define TypeScript interfaces for the form structure
interface Education {
  fieldofstudy: string;
  institution: string;
  graduationYear: number;
  educationLevel: string;
}

interface PhoneNumber {
  prefix: string;
  number: string;
}

interface MotherInformation {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
}

interface FormValues {
  salary: number;
  education: Education[]; // Array of education entries
  motherInformation: MotherInformation;
}

const Step2: React.FC = () => {
  const { register, formState: { errors }, control } = useFormContext<FormValues>();

  // useFieldArray for dynamically managing the education array
  const { fields, append, remove } = useFieldArray({
    control, // Control from react-hook-form
    name: "education" // Path to the field array
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Salary & Education</h2>

      {/* Salary Field */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Salary: <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('salary', {
              required: 'Salary is required',
              min: { value: 1000, message: 'Salary must be at least 1000' },
            })}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
          )}
        </div>
      </div>

      {/* Education Information */}
      <h3 className="text-xl font-bold text-gray-700">Education <span className="text-red-500">*</span></h3>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Field of Study */}
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Field of Study: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register(`education.${index}.fieldofstudy`, { required: 'Field of study is required' })}
              />
             {errors.education?.[index]?.fieldofstudy && (
  <p className="text-red-500 text-sm mt-1">
    {errors.education?.[index]?.fieldofstudy?.message}
  </p>
)}
            </div>

            {/* Institution */}
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Institution: <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register(`education.${index}.institution`, { required: 'Institution is required' })}
              >
               <option value="">Select Institution</option>
<option value="Addis Ababa University">Addis Ababa University</option>
<option value="Adama Science and Technology University">Adama Science and Technology University</option>
<option value="Addis Ababa Science and Technology University">Addis Ababa Science and Technology University</option>
<option value="Addis Continental Institute of Public Health">Addis Continental Institute of Public Health</option>
<option value="Adigrat University">Adigrat University</option>
<option value="Admas University">Admas University</option>
<option value="Ambo University">Ambo University</option>
<option value="Arba Minch University">Arba Minch University</option>
<option value="Arsi University">Arsi University</option>
<option value="Axum University">Axum University</option>
<option value="Bahir Dar University">Bahir Dar University</option>
<option value="Bule Hora University">Bule Hora University</option>
<option value="Debre Berhan University">Debre Berhan University</option>
<option value="Debre Markos University">Debre Markos University</option>
<option value="Debre Tabor University">Debre Tabor University</option>
<option value="Dilla University">Dilla University</option>
<option value="Dire Dawa University">Dire Dawa University</option>
<option value="Gambella University">Gambella University</option>
<option value="Haramaya University">Haramaya University</option>
<option value="Hawassa University">Hawassa University</option>
<option value="Jimma University">Jimma University</option>
<option value="Jigjiga University">Jigjiga University</option>
<option value="Madda Walabu University">Madda Walabu University</option>
<option value="Mekelle University">Mekelle University</option>
<option value="Mizan-Tepi University">Mizan-Tepi University</option>
<option value="Samara University">Samara University</option>
<option value="St. Mary's University">St. Mary's University</option>
<option value="University of Gondar">University of Gondar</option>
<option value="Wachemo University">Wachemo University</option>
<option value="Wolaita Sodo University">Wolaita Sodo University</option>
<option value="Wolkite University">Wolkite University</option>
<option value="Wollo University">Wollo University</option>
<option value="Wollega University">Wollega University</option>
<option value="Unity University">Unity University</option>
<option value="Rift Valley University">Rift Valley University</option>

              </select>
              {errors.education?.[index]?.institution && (
  <p className="text-red-500 text-sm mt-1">
    {errors.education?.[index]?.institution?.message}
  </p>
)}
            </div>

            {/* Graduation Year */}
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Graduation Year: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register(`education.${index}.graduationYear`, {
                  required: 'Graduation year is required',
                  min: { value: 1900, message: 'Graduation year must be after 1900' },
                  max: { value: new Date().getFullYear(), message: 'Graduation year cannot be in the future' },
                })}
              />
              {errors.education?.[index]?.graduationYear && (
  <p className="text-red-500 text-sm mt-1">
    {errors.education?.[index]?.graduationYear?.message}
  </p>
)}
            </div>

            {/* Education Level */}
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Education Level: <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                {...register(`education.${index}.educationLevel`, { required: 'Education level is required' })}
              >
                <option value="">Select Education Level</option>
<option value="8th Grade">8th Grade</option>
<option value="10th Grade">10th Grade</option>
<option value="12th Grade">12th Grade</option>
<option value="TVET">TVET (Technical and Vocational Education and Training)</option>
<option value="Diploma">Diploma</option>
<option value="Bachelor's Degree">Bachelor's Degree</option>
<option value="Master's Degree">Master's Degree</option>
<option value="Doctorate">Doctorate (PhD)</option>
<option value="Other">Other</option>

              </select>
              {errors.education?.[index]?.educationLevel && (
  <p className="text-red-500 text-sm mt-1">
    {errors.education?.[index]?.educationLevel?.message}
  </p>
)}

            </div>

            {/* Remove Button */}
            <div className="form-group col-span-3">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm underline"
              >
                Remove Education
              </button>
            </div>
          </div>
        ))}

        {/* Add Education Button */}
        <button
          type="button"
          onClick={() =>
            append({
              fieldofstudy: '',
              institution: '',
              graduationYear: 2000,
              educationLevel: ''
            })
          }
          className="text-blue-500 text-sm underline"
        >
          + Add Education
        </button>
      </div>

      {/* Mother's Information */}
      <h3 className="text-xl font-bold text-gray-700 mt-6">Mother's Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mother's First Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            First Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('motherInformation.firstName', {
              required: 'Mother\'s first name is required',
            })}
          />
          {errors.motherInformation?.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motherInformation.firstName.message}
            </p>
          )}
        </div>

        {/* Mother's Middle Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Middle Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('motherInformation.middleName', {
              required: 'Mother\'s middle name is required',
            })}
          />
          {errors.motherInformation?.middleName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motherInformation.middleName.message}
            </p>
          )}
        </div>

        {/* Mother's Last Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Last Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('motherInformation.lastName', {
              required: 'Mother\'s last name is required',
            })}
          />
          {errors.motherInformation?.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motherInformation.lastName.message}
            </p>
          )}
        </div>

        {/* Mother's Phone Prefix */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Phone Prefix: <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('motherInformation.phoneNumber.prefix', {
              required: 'Phone prefix is required',
            })}
          >
            <option value="">Select Prefix</option>
            <option value="+251">+251</option>
            {/* Add more options as needed */}
          </select>
          {errors.motherInformation?.phoneNumber?.prefix && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motherInformation.phoneNumber.prefix.message}
            </p>
          )}
        </div>

        {/* Mother's Phone Number */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Phone Number: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('motherInformation.phoneNumber.number', {
              required: 'Phone number is required',
            })}
          />
          {errors.motherInformation?.phoneNumber?.number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motherInformation.phoneNumber.number.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
