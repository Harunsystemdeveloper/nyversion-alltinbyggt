namespace WebApp;

public static class DbInit
{
    public static void EnsureAclDefaults()
    {
        // Ensure DELETE on /api/posts is allowed for users and admins (ownership enforced in code)
        SQLQueryOne(@"
            INSERT INTO acl (userRoles, method, allow, route, match, comment)
            SELECT 'user,admin','DELETE','allow','/api/posts','true','Users can delete own posts; admins all'
            WHERE NOT EXISTS (
              SELECT 1 FROM acl WHERE method='DELETE' AND route='/api/posts'
            )
        ");
    }
}

