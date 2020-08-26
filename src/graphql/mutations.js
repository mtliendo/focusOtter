/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivityDay = /* GraphQL */ `
  mutation CreateActivityDay(
    $input: CreateActivityDayInput!
    $condition: ModelActivityDayConditionInput
  ) {
    createActivityDay(input: $input, condition: $condition) {
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
export const updateActivityDay = /* GraphQL */ `
  mutation UpdateActivityDay(
    $input: UpdateActivityDayInput!
    $condition: ModelActivityDayConditionInput
  ) {
    updateActivityDay(input: $input, condition: $condition) {
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
export const deleteActivityDay = /* GraphQL */ `
  mutation DeleteActivityDay(
    $input: DeleteActivityDayInput!
    $condition: ModelActivityDayConditionInput
  ) {
    deleteActivityDay(input: $input, condition: $condition) {
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
export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
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
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
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
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
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
