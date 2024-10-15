import os


def create_directory(dir_path):
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
        print(f"Created directory: {dir_path}")

def create_file(file_path, content):
    if not os.path.exists(file_path):
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"Created file: {file_path}")


def create_module(base, module_name):
    module_structure = {
        module_name: {
            'components': {
                f'{module_name.capitalize()}Component.tsx': f'export const {module_name.capitalize()}Component = () => <div>{module_name.capitalize()} Component</div>;',
            },
            'features': {
                f'{module_name}Feature.ts': f'export const {module_name}Feature = () => {{}};',
            },
            'layout': {
                f'{module_name}Layout.tsx': f'export const {module_name.capitalize()}Layout = () => <div>layout</div>;',
            },
            'services': {
                f'{module_name}Service.ts': f'export const {module_name}Service = () => {{}};',
            },
            'store': {
                f'{module_name}Store.ts': f'export const use{module_name.capitalize()}Store = () => {{}}; // React Query store setup here',
            },
            'utils': {
                f'{module_name}Utils.ts': f'export const {module_name}Util = () => {{}};',
            },
            'index.tsx': f'''
import React from 'react';
import {{ Routes, Route }} from 'react-router-dom';
import {module_name.capitalize()}Component from './components/{module_name.capitalize()}Component';

const {module_name.capitalize()}Module: React.FC = () => {{
  return (
    <Routes>
      <Route path="/" element={{<{module_name.capitalize()}Component />}} />
    </Routes>
  );
}};

export default {module_name.capitalize()}Module;
'''
        }
    }
    generate_structure(base, module_structure)

# Function to create folder structure and files
def generate_structure(base, struct):
    for key, value in struct.items():
        current_path = os.path.join(base, key)
        if isinstance(value, dict):
            create_directory(current_path)
            generate_structure(current_path, value)
        else:
            create_file(current_path, value)

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <module_name>")
        sys.exit(1)

    module_name = sys.argv[1]

    # Base directory (assumed to already exist)
    base_dir = '.'

    # Generate a new module by calling create_module with the user-provided name
    create_module(base_dir, module_name)

    print(f'Module "{module_name}" generated successfully!')
