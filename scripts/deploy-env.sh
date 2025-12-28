#!/bin/bash

# URL
echo "Adding NEXT_PUBLIC_SUPABASE_URL..."
echo -n "https://pndmpusmzgiebvbvpmat.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production > /dev/null
echo -n "https://pndmpusmzgiebvbvpmat.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL preview > /dev/null
echo -n "https://pndmpusmzgiebvbvpmat.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL development > /dev/null

# ANON KEY
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZG1wdXNtemdpZWJ2YnZwbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTA5MzIsImV4cCI6MjA3OTgyNjkzMn0.B86g9ITnRe-mf6fad0O4BGKCEKA7RU82Xa1AmDDQpFU"
echo "Adding NEXT_PUBLIC_SUPABASE_ANON_KEY..."
echo -n "$KEY" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production > /dev/null
echo -n "$KEY" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview > /dev/null
echo -n "$KEY" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development > /dev/null

# SERVICE KEY
SKEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZG1wdXNtemdpZWJ2YnZwbWF0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI1MDkzMiwiZXhwIjoyMDc5ODI2OTMyfQ.Ol428qhyMBo4F1_0mUPRgO070i4es02b70sC39bB9dY"
echo "Adding SUPABASE_SERVICE_ROLE_KEY..."
echo -n "$SKEY" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY production > /dev/null
echo -n "$SKEY" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY preview > /dev/null
echo -n "$SKEY" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY development > /dev/null

echo "Environment variables added."
