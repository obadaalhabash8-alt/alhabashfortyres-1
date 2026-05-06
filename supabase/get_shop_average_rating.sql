-- One-time setup: paste this into the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Once deployed, /api/average-rating uses this aggregate instead of fetching all rows in JS.

CREATE OR REPLACE FUNCTION get_shop_average_rating(p_shop_id integer)
RETURNS TABLE(average numeric, count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    COALESCE(ROUND(AVG(rating)::numeric, 1), 0) AS average,
    COUNT(*)                                      AS count
  FROM ratings
  WHERE shop_id = p_shop_id;
$$;
