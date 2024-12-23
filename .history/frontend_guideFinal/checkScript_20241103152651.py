import pandas as pd

def find_unique_emails(file1, file2, output1, output2):
    # Read CSV files
    df1 = pd.read_csv(file1)
    df2 = pd.read_csv(file2)
    
    # Extract email columns
    emails1 = set(df1['email'].str.lower().dropna())
    emails2 = set(df2['email'].str.lower().dropna())
    
    # Find emails unique to each file
    unique_to_file1 = emails1 - emails2
    unique_to_file2 = emails2 - emails1
    
    # Output unique emails to separate CSV files
    pd.DataFrame(list(unique_to_file1), columns=['email']).to_csv(output1, index=False)
    pd.DataFrame(list(unique_to_file2), columns=['email']).to_csv(output2, index=False)

    print(f"Unique emails from {file1} saved to {output1}")
    print(f"Unique emails from {file2} saved to {output2}")

# Usage example:
find_unique_emails('guides2.csv', 'file2.csv', 'unique_to_file1.csv', 'unique_to_file2.csv')
