const pool = require("./db/db");

async function testTables() {
  try {
    console.log("Testing database connection...");

    // Test each table
    const tables = [
      "comments",
      "videos",
      "comments_after_spam",
      "comments_after_spam_eng",
    ];

    for (const table of tables) {
      try {
        const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(
          `✅ Table '${table}' exists with ${result.rows[0].count} rows`
        );
      } catch (error) {
        console.log(`❌ Table '${table}' error:`, error.message);
      }
    }

    // Test a simple query
    try {
      const result = await pool.query("SELECT NOW()");
      console.log("✅ Database connection working:", result.rows[0].now);
    } catch (error) {
      console.log("❌ Database connection failed:", error.message);
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    process.exit(0);
  }
}

testTables();
