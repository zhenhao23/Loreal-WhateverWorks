import pandas as pd
import os

# Path to the CSV file
csv_path = "../sample_final_output.csv"

def trim_csv_to_1000_rows():
    """
    Reads the CSV file and keeps only the first 1000 rows (including header),
    then saves it back to the same file.
    """
    try:
        # Read the CSV file
        print("Reading CSV file...")
        df = pd.read_csv(csv_path)
        
        print(f"Original file has {len(df)} rows")
        
        # Keep only the first 1000 rows
        df_trimmed = df.head(1000)
        
        print(f"Trimmed file will have {len(df_trimmed)} rows")
        
        # Save back to the same file
        df_trimmed.to_csv(csv_path, index=False)
        
        print(f"Successfully saved trimmed CSV with {len(df_trimmed)} rows to {csv_path}")
        
    except FileNotFoundError:
        print(f"Error: Could not find the file {csv_path}")
    except Exception as e:
        print(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    # Check if file exists
    if os.path.exists(csv_path):
        trim_csv_to_1000_rows()
    else:
        print(f"File {csv_path} does not exist. Please check the path.")
