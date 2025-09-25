import pandas as pd
import os

# Path to the CSV file
csv_path = "final_after_spam_eng.csv"
output_path = "final_after_spam_eng_1000.csv"

def trim_csv_to_1000_rows():
    """
    Reads the CSV file and keeps only the first 1000 rows (including header),
    then saves it to a new file.
    """
    try:
        # Read the CSV file
        print("Reading CSV file...")
        df = pd.read_csv(csv_path)
        
        print(f"Original file has {len(df)} rows")
        
        # Keep only the first 1000 rows
        df_trimmed = df.head(1000)
        
        print(f"Trimmed file will have {len(df_trimmed)} rows")
        
        # Save to a new file
        df_trimmed.to_csv(output_path, index=False)
        
        print(f"Successfully saved trimmed CSV with {len(df_trimmed)} rows to {output_path}")
        print(f"Original file {csv_path} remains unchanged")
        
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
