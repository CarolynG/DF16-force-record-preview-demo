public class QueryRelatedRecordsController {
    
    /**
     * Query for records related to another record
     * @param recordId the id of the parent record
     * @param entityToQuery the entity to put in the "FROM" portion of the query
     * @param relationshipName the relationship field on the entityToQuery that will contain the recordId value
     * @return List<String> a list of ids of records related to the given record
     */
    @AuraEnabled
    public static List<String> getRelatedRecordIds(String recordId, String entityToQuery, String relationshipName) {
        List<String> ids = new List<String>();
        String query = 'SELECT Id, CreatedDate FROM ' + entityToQuery + ' WHERE '+ relationshipName + ' = \'' + recordId + '\' ORDER BY CreatedDate DESC LIMIT 3 ';
        List<sObject> relatedRecords = Database.query(query);

        for (sObject rec : relatedRecords) {
            ids.add((String)rec.get('Id'));
        }
        return ids;
    }
}