import importlib

modules = ["get_latin_lunchs", "get_school_days", "filter"]


def run():
    for module_name in modules:
        try:
            module = importlib.import_module(module_name)
            if hasattr(module, "run"):
                print(f"Running {module_name}.run()...")
                module.run()
            else:
                print(f"Warning: {module_name} does not have a 'run' function.")
        except Exception as e:
            print(f"Error running {module_name}: {e}")


if __name__ == "__main__":
    run()
