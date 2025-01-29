import os

# Helper function to create directories
def create_directory(dir_path):
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
        print(f"Created directory: {dir_path}")

# Helper function to create files with sample content
def create_file(file_path, content):
    if not os.path.exists(file_path):
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"Created file: {file_path}")

# The base directory is 'src' (assumed to already exist)
base_dir = '.'

# Folder structure (excluding App.tsx and index.tsx, and no 'src' folder creation)
structure = {
    'common': {
        'components': {
            'sampleComponent.tsx': 'export const SampleComponent = () => <div>Common Component</div>;',
        },
        'hooks': {
            'useCommonHook.ts': 'export const useCommonHook = () => {};'
        },
        'utils': {
            'commonUtils.ts': 'export const commonUtil = () => {};'
        }
    },
    'modules': {
        'home': {
            'components': {
                'HomeComponent.tsx': 'export const HomeComponent = () => <div>Home Component</div>;',
            },
            'features': {
                'homeFeature.ts': 'export const homeFeature = () => {};'
            },
            'layout': {
                'homeLayout.tsx': 'export const HomeLayout = () => <div>home layout</div>;'
            },
            'services': {
                'homeService.ts': 'export const homeService = () => {};'
            },
            'store': {
                'homeStore.ts': 'export const useHomeStore = () => {}; // React Query store setup here'
            },
            'utils': {
                'homeUtils.ts': 'export const homeUtil = () => {};'
            },
            'index.ts': 'export * from \'./components/HomeComponent\';'
        },
        'employee': {
            'components': {
                'EmployeeComponent.tsx': 'export const EmployeeComponent = () => <div>Employee Component</div>;',
            },
            'services': {
                'employeeService.ts': 'export const employeeService = () => {};'
            },
            'store': {
                'employeeStore.ts': 'export const useEmployeeStore = () => {}; // React Query store setup here'
            },
            'index.ts': 'export * from \'./components/EmployeeComponent\';'
        }
    },
    'store': {
        'global.ts': 'export const useGlobalStore = () => {}; // React Query global store setup here'
    }
}

# Function to create folder structure and files
def generate_structure(base, struct):
    for key, value in struct.items():
        current_path = os.path.join(base, key)
        if isinstance(value, dict):
            create_directory(current_path)
            generate_structure(current_path, value)
        else:
            create_file(current_path, value)

# Generate the folder structure inside the existing 'src' directory
generate_structure(base_dir, structure)

print('Folder structure generated successfully!')

