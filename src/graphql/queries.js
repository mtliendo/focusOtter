/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivityDay = /* GraphQL */ `
  query GetActivityDay($id: ID!) {
    getActivityDay(id: $id) {
      id
      daysInSecs
      activities {
        items {
          id
          activityID
          title
          description
          timeStart
          duration
          categories
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      journalEntry
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listActivityDays = /* GraphQL */ `
  query ListActivityDays(
    $filter: ModelActivityDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivityDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        daysInSecs
        activities {
          items {
            id
            activityID
            title
            description
            timeStart
            duration
            categories
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        journalEntry
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      id
      activityID
      title
      description
      timeStart
      duration
      categories
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listActivitys = /* GraphQL */ `
  query ListActivitys(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        activityID
        title
        description
        timeStart
        duration
        categories
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const activityByDaysInSecs = /* GraphQL */ `
  query ActivityByDaysInSecs(
    $daysInSecs: Int
    $sortDirection: ModelSortDirection
    $filter: ModelActivityDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activityByDaysInSecs(
      daysInSecs: $daysInSecs
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        daysInSecs
        activities {
          items {
            id
            activityID
            title
            description
            timeStart
            duration
            categories
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        journalEntry
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
