import time, sys

def flush_print(msg):
    print(msg)
    sys.stdout.flush()

def main():
    flush_print("STEP: Data cleaning started")
    time.sleep(2)  # simulate work
    flush_print("STEP: Data cleaning completed")

    flush_print("STEP: Spam detection started")
    time.sleep(2)
    flush_print("STEP: Spam detection completed")

    flush_print("STEP: Analysis started")
    time.sleep(2)
    flush_print("STEP: Analysis completed")

    flush_print("DONE: cleaned_data.csv")

if __name__ == "__main__":
    main()
