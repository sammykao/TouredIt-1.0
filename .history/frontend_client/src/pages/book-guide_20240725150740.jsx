exports.getGuideInfo = async (req, res) => {
  try {
      const guide = req.body; // Says search, but filter by colleges for now

      if (!guide.email) {
          res.status(400).json({ message: 'Must provide an email to get guide' });
          return;
      }

      // Query to get the guide's info along with campus activities and hobbies
      const query = `
          SELECT 
              tg.id, tg.name, tg.email, tg.school, tg.hometown, tg.phone, tg.bio,
              tg.major, tg.secondary_major, tg.minor, tg.secondary_minor,
              tg.profile_image_url, tg.num_tours, tg.instagram, tg.linkedin,
              COALESCE(json_agg(DISTINCT jsonb_build_object('name', ca.activity_name, 'description', ca.activity_description)) FILTER (WHERE ca.activity_name IS NOT NULL), '[]') AS activities,
              COALESCE(json_agg(DISTINCT jsonb_build_object('name', h.hobby_name, 'description', h.hobby_description)) FILTER (WHERE h.hobby_name IS NOT NULL), '[]') AS hobbies
          FROM 
              tour_guides tg
          LEFT JOIN 
              campus_involvement ca ON tg.id = ca.tourguide_id
          LEFT JOIN 
              hobbies h ON tg.id = h.tourguide_id
          WHERE 
              tg.email = $1
          GROUP BY 
              tg.id`;

      const values = [guide.email];

      const result = await db.query(query, values);

      if (result.rows.length === 0) {
          res.status(404).json({ message: "Guide Not Found" });
      } else {
          // Initialize guide info
          const guideInfo = {
              name: result.rows[0].name,
              email: result.rows[0].email,
              school: result.rows[0].school,
              hometown: result.rows[0].hometown,
              phone: result.rows[0].phone,
              bio: result.rows[0].bio,
              major: result.rows[0].major,
              secondary_major: result.rows[0].secondary_major,
              minor: result.rows[0].minor,
              secondary_minor: result.rows[0].secondary_minor,
              profile_image_url: result.rows[0].profile_image_url,
              instagram: result.rows[0].instagram,
              linkedin: result.rows[0].linkedin,
              num_tours: result.rows[0].num_tours,
              activities: result.rows[0].activities,
              hobbies: result.rows[0].hobbies
          };
          res.status(200).json({ guide: guideInfo });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
