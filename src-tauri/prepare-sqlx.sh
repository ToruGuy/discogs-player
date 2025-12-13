#!/usr/bin/env bash
# Script to prepare SQLx query cache for offline compilation
# This allows others to build the project without a DATABASE_URL

set -e

echo "🔧 Preparing SQLx query cache..."

# Create temporary database
TEMP_DB="temp_sqlx_prepare.db"
echo "📦 Creating temporary database: $TEMP_DB"
sqlite3 "$TEMP_DB" < schema.sql

# Set DATABASE_URL for sqlx prepare
export DATABASE_URL="sqlite:$TEMP_DB"

echo "🔍 Running cargo sqlx prepare..."
cargo sqlx prepare -- --lib --bins

echo "🧹 Cleaning up temporary database..."
rm -f "$TEMP_DB"

echo "✅ SQLx query cache generated successfully!"
echo "📝 The .sqlx/ directory can now be committed to git"
echo ""
echo "Next steps:"
echo "  1. Review the generated .sqlx/ directory"
echo "  2. git add .sqlx/"
echo "  3. git commit -m 'Add SQLx query cache for offline compilation'"
